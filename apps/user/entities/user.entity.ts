import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryColumn('uuid')
  id:string

  @Column({unique:true,nullable:false})
  email:string

  @Column({nullable:false})
  password:string

  @Column({nullable:false,default:'admin'})
  role:string
}