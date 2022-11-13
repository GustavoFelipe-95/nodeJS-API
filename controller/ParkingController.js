const ParkingModel = require('./../models/parking');

module.exports = {

    async entered(req, res){
        var { plate } = req.body;

        const validatePlate = /[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3}-[0-9]{4}/gm;
        const validator     = validatePlate.test(plate);

        if(validator){
            var plate = plate.toUpperCase();
        }else{
            res.status(406).json({
                message: 'A placa informada não esta dentro dos parametros permitidos'
            });
            return;
        }

        const result = { plate };

        try {
            const parkingSign = await ParkingModel.findOne(
                { plate: plate, left: false }
            );

            if(parkingSign){
                res.status(428).json({message: 'Esta placa já se encontra estacionada'});
                return;
            }

            const newPlate          = await ParkingModel.create(result);
            const objectId          = newPlate._id;
            const myObjectIdString  = objectId.toString();       
            newPlate.reservation    = myObjectIdString.substr(0, 6);
            const dado              = await newPlate.save();
            res.status(201).json({
                "reservation": dado.reservation,
                "plate": dado.plate,
                "entered_at": dado.parking_entrance
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async payment(req, res){
        var param    = req.params.id;
        const plate  = param.toUpperCase();
        const paid   = true;
        const parking_payment = Date.now();
        const result = { paid, parking_payment };

        try {
            const parkingSign = await ParkingModel.findOne(
                { plate: plate, left: false }
            );

            if(!parkingSign){
                res.status(422).json({message: 'Não há registro desta placa'});
                return;
            }

            if(parkingSign.length === 0){
                res.status(422).json({message: 'Não há registro desta placa'});
                return;
            }

            if(parkingSign.paid === true){
                res.status(428).json({message: 'Pagamento já realizado'});
                return;
            }

            await ParkingModel.updateOne({ _id: parkingSign._id }, result);

            res.status(200).json({
                reservation: parkingSign.reservation,
                plate: parkingSign.plate,
                paid: paid
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async left(req, res){
        var param    = req.params.id;
        const plate  = param.toUpperCase();
        const left   = true;
        const parking_exit = Date.now();
        const result = { left, parking_exit };

        try {
            const parkingSign = await ParkingModel.findOne(
                { plate: plate, left: false }
            );

            if(!parkingSign){
                res.status(422).json({message: 'Não há registro desta placa'});
                return;
            }

            if(parkingSign.paid === false){
                res.status(428).json({message: 'Pagamento necesario'});
                return;
            }

            await ParkingModel.updateOne({ _id: parkingSign._id }, result);

            const newResult = await ParkingModel.findOne({ _id: parkingSign._id });

            res.status(200).json({
                reservation: newResult.reservation,
                plate: newResult.plate,
                paid: newResult.paid,
                left: newResult.left
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async history(req, res){
        var param   = req.params.id;
        const plate = param.toUpperCase();
        try {
            const historic = await ParkingModel.find({ plate: plate });
            if(historic.length === 0){
                res.status(422).json({message: 'Não há nenhum registro desta placa'});    
                return;
            }

            var callbackData = [];

            historic.map(function(item, indice){
                var resultado       = "";

                var inicio          = new Date(item.parking_entrance);
                if(item.left === false){
                    var fim         = Date.now();
                }else{
                    var fim         = new Date("2022-11-15T22:55:33.228Z");
                    // var fim      = new Date(item.parking_exit);
                }

                var diferenca       = new Date( fim - inicio );

                // Diferença entre datas ----------------------------
                var diff            = diferenca.getTime();
                var daydiff         = diff / (1000 * 60 * 60 * 24);
                var dayDiffString   = daydiff.toString();
                const arrayDays     = dayDiffString.split(".");

                if(arrayDays[0] !== "0"){
                    resultado += arrayDays[0] + "days ";
                    resultado += diferenca.getUTCHours() + "hours";
                }else{
                    resultado += diferenca.getUTCHours() + "h ";
                    resultado += diferenca.getUTCMinutes() + "m ";
                    resultado += diferenca.getUTCSeconds() + "s";
                }
                // --------------------------------------------------

                callbackData.push({
                    time: resultado,
                    paid: item.paid,
                    left: item.left,
                    reservation: item.reservation,
                    plate: item.plate
                });
            });

            res.status(200).json(callbackData);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    },

    async deleteTest(req, res){
        // Só sera usado para apagar todos os dados de teste
        try{
            const hist = await ParkingModel.deleteMany();
            res.status(200).json({message: 'Placa removida com sucesso.'});
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

}
