import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../../doctor/entity/doctor.entity';
import { Patient } from '../../patients/entity/patients.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  date: string; // e.g., YYYY-MM-DD

  @Column({ length: 10 })
  time: string; // e.g., HH:mm

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  doctor: Doctor;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  patient: Patient;
}
