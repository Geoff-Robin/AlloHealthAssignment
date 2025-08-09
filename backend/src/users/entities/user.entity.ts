import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


export enum UserRole {
    DOCTOR = "doctor",
    PATIENT = "patient",
    FRONT_DESK = "front_desk"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt
    @Column({ type: 'varchar', length: 50 })
    username: string
    @Column({ type: 'varchar', length: 100 })
    password: string
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT,
    })
    role: UserRole
    @Column({ type: 'varchar', length: 200, nullable: true })
    refreshToken: string | null
}
