import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProductImage } from "./product-image.entity"
import { User } from "src/auth/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger"


@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '98f4f859-6f12-492e-a7ec-85f3fcfde803',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique:true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price'
    })
    @Column('float', {
        default: 0
    })
    price: number

    
    @ApiProperty({
        example: 'Lorem ipsum...',
        description: 'Product description'
    })
    @Column('text', {
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product slug'
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    
    @ApiProperty({
        example: 0,
        description: 'Product stock'
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['S', 'M', 'L'],
        description: 'Product sizes'
    })
    @Column('text', {
        array:true
    })
    sizes: string[]

    @ApiProperty({
        example: ['Streetwear', 'Fashion', 'Moda'],
        description: 'Product tags'
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty({
        example: '',
        description: 'Product tags'
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @OneToMany(() => ProductImage, (productImage) => productImage.product,
    {cascade: true, eager: true})
    images?: ProductImage[];

    @ManyToOne(
    () => User, (user) => user.product,
    {eager: true}
    )
    user: User




    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
           this.slug = this.title
        } 
            this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
        
    }

    @BeforeUpdate()
    checkSlugUpdate() {
            this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
        
    }
}   
