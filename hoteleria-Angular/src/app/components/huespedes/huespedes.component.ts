import { Component } from '@angular/core';
import { HuespedResponse } from '../../models/Huesped';
import { HuespedesService } from '../../services/huespedes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-huespedes',
  standalone: false,
  templateUrl: './huespedes.component.html',
  styleUrl: './huespedes.component.css'
})
export class HuespedesComponent {
  huespedes: HuespedResponse[] = [];
  showForm: boolean = false;
  huespedForm: FormGroup;
  modalText: string = 'Nuevo Huésped';
  selectedHuesped: HuespedResponse | null = null;
  isEditMode: boolean = false;

  constructor(
    private huespedesService: HuespedesService,
    private fb: FormBuilder
  ) {
    this.huespedForm = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(15)]],
      documento: ['', [Validators.required, Validators.maxLength(20)]],
      nacionalidad: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.listarHuespedes();
  }

  listarHuespedes(): void {
    this.huespedesService.getHuespedes().subscribe({
      next: resp => {
        this.huespedes = resp;
        console.log(this.huespedes);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.resetForm();
  }

  resetForm(): void {
    this.modalText = 'Nuevo Huésped';
    this.isEditMode = false;
    this.selectedHuesped = null;
    this.huespedForm.reset();
  }

  editHuesped(huesped: HuespedResponse): void {
    this.showForm = true;
    this.modalText = 'Editando huésped: ' + huesped.nombre + ' ' + huesped.apellido;
    this.isEditMode = true;
    this.selectedHuesped = huesped;
    this.huespedForm.patchValue({ ...huesped });
  }

  onSubmit(): void {
    if (this.huespedForm.valid) {
      const huespedData = this.huespedForm.value;
      if (this.isEditMode) {
        this.huespedesService.putHuesped(huespedData, huespedData.id).subscribe({
          next: huesped => {
            const index = this.huespedes.findIndex(h => h.id === huesped.id);
            if (index !== -1) {
              this.huespedes[index] = huesped;
            }
            Swal.fire({
              icon: 'success',
              title: 'Huésped Actualizado',
              text: 'El huésped ha sido actualizado exitosamente'
            });
            this.resetForm();
            this.showForm = false;
          }
        });
      } else {
        this.huespedesService.postHuesped(huespedData).subscribe({
          next: huesped => {
            this.huespedes.push(huesped);
            Swal.fire({
              icon: 'success',
              title: 'Huésped Registrado',
              text: 'El huésped ha sido registrado exitosamente'
            });
            this.resetForm();
            this.showForm = false;
          }
        });
      }
    }
  }

  deleteHuesped(huespedId: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar al huésped?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(resp => {
      if (resp.isConfirmed) {
        this.huespedesService.deleteHuesped(huespedId).subscribe({
          next: deleted => {
            this.huespedes = this.huespedes.filter(h => h.id !== huespedId);
            Swal.fire({
              icon: 'success',
              title: 'Huésped eliminado',
              text: 'El huésped ha sido eliminado exitosamente'
            });
          }
        });
      }
    });
  }
}