import { Component } from '@angular/core';
import { HabitacionResponse } from '../../models/Habitacion';
import { HabitacionesService } from '../../services/habitaciones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-habitaciones',
  standalone: false,
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent {

  habitaciones: HabitacionResponse[]=[];
  showForm: boolean=false;
  habitacionForm: FormGroup;
  modalText: string='Nuevo Habitacion';
  selectedHabitacion: HabitacionResponse | null=null;
  isEditMode: boolean=false;
  showActions: boolean=true;

  constructor(private habitacionesService: HabitacionesService, private formBuilder: FormBuilder){
    this.habitacionForm=this.formBuilder.group({
      id:[null],
      nombre: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void{
      this.listarHabitaciones();
  } 

  listarHabitaciones(): void{
    this.habitacionesService.getHabitaciones().subscribe({
      next: resp=>{
        this.habitaciones=resp;
        console.log(this.habitaciones);
      }
    });
  }

  toggleForm(){
    this.showForm=!this.showForm;
    this.resetForm();
  }

  resetForm(){
    this.modalText='Nueva Habitacion';
    this.isEditMode=false;
    this.selectedHabitacion=null;
    this.habitacionForm.reset();
  }

  editHabitacion(habitacion: HabitacionResponse): void{
    this.showForm=true;
    this.modalText='Editando habitacion '+habitacion.numero;
    this.isEditMode=true;
    this.selectedHabitacion=habitacion;
    this.habitacionForm.patchValue({
      ...habitacion
    });
  }


    onSubmit(): void{
      if(this.habitacionForm.valid){
        const habitacionData=this.habitacionForm.value;
        if(this.isEditMode){
          this.habitacionesService.putHabitacion(habitacionData,habitacionData.id).subscribe({
            next: habitacion =>{
              const index=this.habitaciones.findIndex(t=>t.id===habitacion.id);
              if(index!==-1){
                this.habitaciones[index]=habitacion;
              }
              Swal.fire({
                icon: 'success',
                title: 'Habitacion Actualizada',
                text: 'La habitacion ha sido actualizada exitosamente'
              });
              this.resetForm();
              this.showForm=false;
            }
            });
        }else{
          this.habitacionesService.postHabitacion(habitacionData).subscribe({
            next: habitacion =>{
              this.habitaciones.push(habitacion);
              Swal.fire({
                icon: 'success',
                title: 'Habitacion Registrada',
                text: 'La habitacion ha sido registrada exitosamente'
              });
              this.resetForm();
              this.showForm=false;
            }
            });
        }
    }
  }

  deleteTipo(habitacionId: number): void{
    Swal.fire({
      title: 'Estas seguro de eliminar la habitacion?',
      text: 'Eliminar habitacion',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
  }).then(resp=>{
    if(resp.isConfirmed){
      this.habitacionesService.deleteHabitacion(habitacionId).subscribe({
        next: deletedHabitacion =>{
          this.habitaciones=this.habitaciones.filter(t=>t.id!==habitacionId);
          Swal.fire({
            icon: 'success',
            title: 'Tipo '+deletedHabitacion.numero +' eliminado',
            text: 'La habitacion ha sido eliminada exitosamente'
          })
        }
      });    
      }
  });
}
}
