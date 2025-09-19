import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaRequest, ReservaResponse } from '../../models/Reserva';
import { HuespedResponse } from '../../models/Huesped';
import { HabitacionResponse } from '../../models/Habitacion';
import { ReservasService } from '../../services/reservas.service';
import { HuespedesService } from '../../services/huespedes.service';
import { HabitacionesService } from '../../services/habitaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  reservas: ReservaResponse[] = [];
  huespedes: HuespedResponse[] = [];
  habitaciones: HabitacionResponse[] = [];

  showForm: boolean = false;
  reservaForm: FormGroup;
  modalText: string = 'Nueva Reserva';
  isEditMode: boolean = false;
  selectedReserva: ReservaResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private huespedesService: HuespedesService,
    private habitacionesService: HabitacionesService
  ) {
    this.reservaForm = this.fb.group({
      id: [null],
      huespedId: [null, Validators.required],
      habitacionId: [null, Validators.required],
      fechaEntrada: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      estado: ['', Validators.required],
      noches: [{ value: 0, disabled: true }], 
      total: [{ value: 0, disabled: true }] 
    });
  }

  ngOnInit(): void {
    this.listarReservas();
    this.listarHuespedes();
    this.listarHabitaciones();
    //this.setupAutoCalculo();
  }

  listarReservas(): void {
    this.reservasService.getReservas().subscribe({
      next: resp=>{
        this.reservas=resp;
        console.log(this.reservas);
      }
    });
  }

  listarHuespedes(): void {
    this.huespedesService.getHuespedes().subscribe({
      next: resp => this.huespedes = resp
    });
  }

  listarHabitaciones(): void {
    this.habitacionesService.getHabitaciones().subscribe({
      next: resp => this.habitaciones = resp
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.resetForm();
  }

  resetForm(): void {
    this.modalText = 'Nueva Reserva';
    this.isEditMode = false;
    this.selectedReserva = null;
    this.reservaForm.reset();
    this.reservaForm.patchValue({ noches: 0, total: 0 });
  }

  editReserva(reserva: ReservaResponse): void {
    this.showForm = true;
    this.modalText = `Editando reserva #${reserva.id}`;
    this.isEditMode = true;
    this.selectedReserva = reserva;
    this.reservaForm.patchValue({ ...reserva });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const formValue = this.reservaForm.getRawValue();
      const entrada = new Date(formValue.fechaEntrada);
      const salida = new Date(formValue.fechaSalida);
      const noches = Math.ceil((salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));

//       const habitacionId = formValue.habitacionId;
// const habitacion = this.habitacionesService.getHabitaciones().forEach(h => h.forEach(h2=>h2.id===habitacionId));

// let total = 0;
// if (habitacion) {
//   total = noches * habitacion.precio;
//   formValue.total = total;
// }


      const reservaData: ReservaRequest = {
        huespedId: formValue.huespedId,
        habitacionId: formValue.habitacionId,
        fechaEntrada: formValue.fechaEntrada,
        fechaSalida: formValue.fechaSalida,
        noches: noches,
        total: formValue.total,
        estado: formValue.estado
      };
      console.log('Datos enviados:', reservaData);
      if (this.isEditMode && formValue.id) {
        this.reservasService.putReserva(reservaData, formValue.id).subscribe({
          next: reserva => {
            const index = this.reservas.findIndex(r => r.id === reserva.id);
            if (index !== -1) this.reservas[index] = reserva;
            Swal.fire('Reserva actualizada', '', 'success');
            this.resetForm();
            this.showForm = false;
          }
        });
      } else {
        this.reservasService.postReserva(reservaData).subscribe({
          next: reserva => {
            this.reservas.push(reserva);
            Swal.fire('Reserva registrada', '', 'success');
            this.resetForm();
            this.showForm = false;
          }
        });
      }
    }
  }

  deleteReserva(reservaId: number): void {
    Swal.fire({
      title: '¿Eliminar reserva?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(resp => {
      if (resp.isConfirmed) {
        this.reservasService.deleteReserva(reservaId).subscribe({
          next: () => {
            this.reservas = this.reservas.filter(r => r.id !== reservaId);
            Swal.fire('Reserva eliminada', '', 'success');
          }
        });
      }
    });
  }

  setupAutoCalculo(): void {
    this.reservaForm.valueChanges.subscribe(val => {
      const entrada = new Date(val.fechaEntrada);
      const salida = new Date(val.fechaSalida);
      const habitacion = this.habitaciones.find(h => h.id === val.habitacionId);

      if (entrada && salida && salida > entrada && habitacion) {
        const noches = Math.ceil((salida.getTime() - entrada.getTime()) / (1000 * 60 * 60 * 24));
        const total = noches * habitacion.precio;
        this.reservaForm.patchValue({ noches, total }, { emitEvent: false });
      } else {
        this.reservaForm.patchValue({ noches: 0, total: 0 }, { emitEvent: false });
      }
    });
  }
}