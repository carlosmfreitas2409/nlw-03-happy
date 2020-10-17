import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: Date.now })
    createdAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}