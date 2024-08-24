import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Injectable()
export class ProduitsService {
  private produits: CreateProduitDto[] = [];
  create(createProduitDto: CreateProduitDto) {
    try {
      this.produits.push(createProduitDto);
      return { success: true, message: `product created successfully` };
    } catch (e) {
      return { error: e.message };
    }
  }

  findAll() {
    return this.produits;
  }

  findOne(id: number) {
    const produit = this.produits.find((product) => product.id === id);

    if (!produit) {
      return { error: 'product not found ' };
    }
    return produit;
  }

  update(id: number, updateProduitDto: UpdateProduitDto) {
    const index = this.produits.findIndex((product) => product.id === id);

    if (index === -1) {
      return { error: 'product not found ' };
    }

    this.produits[index] = { ...this.produits[index], ...updateProduitDto };
    return { success: true, message: `product updated successfully` };
  }

  remove(id: number) {
    const index = this.produits.findIndex((product) => product.id === id);

    if (index === -1) {
      return { error: 'product not found ' };
    }

    this.produits.splice(index, 1);
    return { success: true, message: `product removed successfully` };
  }
}
