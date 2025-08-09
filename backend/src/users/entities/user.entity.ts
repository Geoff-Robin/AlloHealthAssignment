import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: BigInt
    @Column({ type: 'varchar', length: 50})
    username : string
    @Column({ type: 'varchar', length: 100 })
    password: string
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string
    @Column({ type: 'varchar', length: 200 })
    refreshToken: string|null
}
