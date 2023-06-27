import UnitService from "../services/UnitService.js";

class UnitController {

    static addUnit = async(req, res) => {
        const name = req.body;
        
        try {
           const newUnit = await UnitService.addUnit(name);
            res.status(201).send(newUnit);
        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static findAllUnits = async(req, res) => {
        try {
            const units = await UnitService.findAllUnits();
            res.json(units);
        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static findUnitById = async(req, res) => {
        const id = req.params.id;

        try {
            const unit = await UnitService.findUnitById(id);
            res.status(200).send(unit);
        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }
    
    static updateUnit = async(req, res) => {
        const id = req.params.id;
        const update = req.body;
       
        try {

             await UnitService.updateUnit(id, update);
             const updatedUnit = await UnitService.findUnitById(id);
            
            res.status(200).send(updatedUnit);
            
        } catch (error) {
            res.status(500).send({message: error.message});
        }
    }

    static deleteUnit = async(req, res) => {
        const id = req.params.id;
        
        const exists =  await UnitService.findUnitById(id);
        if(!exists) return res.status(404).send({'message': 'No unit found'});
       
        await UnitService.deleteUnit(id);
        res.status(200).send({'message': `Successfully deleted unit ${id}`});
    }

}

export default UnitController;
