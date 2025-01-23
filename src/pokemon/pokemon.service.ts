import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from "mongoose";
import { Pokemon } from "./entities/pokemon.entity";
import { InjectModel } from "@nestjs/mongoose";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }


  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({pokemon_id: term});
    }

    //MongoDB ID
    if( !pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with id ${term} not found`);


    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    try{
      if(updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

      await pokemon.updateOne(updatePokemonDto);

      return {...pokemon.toJSON(),...updatePokemonDto};

    }catch (error){
      this.handleException(error);

    }


  }

  async remove(id: string) {

    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new BadRequestException(`Pokemon with id ${id} not found`);

    return;

  }

  private handleException(error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon with name ${ JSON.stringify(error.keyValue) } already exists`);
    }
    console.log(error);
    throw new InternalServerErrorException('Something went wrong check the logs');
  }
}
