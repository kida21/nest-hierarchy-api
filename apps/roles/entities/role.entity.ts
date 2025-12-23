import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
 @PrimaryGeneratedColumn('uuid')
 id:string

 @Column('varchar',{unique:true})
 name:string
 
 @Column('text')
 description:string

 @Column({nullable:true})
 parentId: string

@ManyToOne(()=>Role,(role) => role.children,{nullable:true})
 @JoinColumn({name:"parentId"})
 parentRole : Role
 
 @OneToMany(()=>Role,(role)=>role.parentRole)
 children : Role[]
 
}