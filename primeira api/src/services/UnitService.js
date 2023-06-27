import Unit from "../models/Unit.js"

class UnitService {


    static addUnit = async(unit) =>{

        const exists = await Unit.findOne({name: unit.name});
        if(exists) return {message: 'Unit already exists!'};

        const newUnit = await Unit.create(unit);
        return newUnit;
    }

    static findAllUnits = async() => {
        const units = await Unit.find();
        if(!units) return {message: 'No unit found.'};
        return units;
    }
    
    static findUnitById = async(id) => {
        const exists = await Unit.exists({_id: id});
        if(!exists) return {message: 'No unit found.'};

        const unit = await Unit.findById(id);
        return unit;
    }

    static updateUnit = async(id, update) => {
        const exists = await Unit.exists({_id: id});
        if(!exists) return {message: 'No unit found.'};

        await Unit.findByIdAndUpdate(id, {$set: update});

        const updatedUnit = await this.findUnitById(id);
        return updatedUnit;
    }

    static deleteUnit = async(id) => {

        await Unit.deleteOne({_id: id});
        return {message: 'Unit deleted successfully.'}
    }

}
export default UnitService;
