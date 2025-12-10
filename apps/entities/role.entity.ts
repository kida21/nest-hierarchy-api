import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
 @PrimaryGeneratedColumn('uuid')
 id:string
 @Column('varchar')
 name:string
 @Column('text')
 description:string
 @ManyToOne(()=>Role,role => role.children)
 parentRole : Role
 @OneToMany(()=>Role,role=>role.parentRole)
 children : Role[]
 
}