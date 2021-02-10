const DateFormat = require('dateformat')

const MASK = 'yyyy-mm-dd HH:MM';

var Type = {
    INSERT: 0,
    INTERVAL: 1,
    ALL: 2,
    AGREGATE: 3
}

class Registro{
    constructor(){
        this.minIntervalo = ''
        this.maxIntervalo = ''
        
        this.tipo = ''
        this.timeSet = ''
        this.medida = 0
        this.usuario = ''

        this.operacion = 0
    }

    Data(){
        var that = this;

        var newRegister = function (req) {
            that.operacion = Type.INSERT;
            that.usuario = req.usuario;
            that.timeSet = DateFormat(req.time, MASK);
            that.tipo = req.tipo;
            that.medida = req.medicion;
        }

        var getInterval = function (req) {
            that.operacion = Type.INTERVAL;
            that.usuario = req.usuario;
            that.tipo = req.tipo;
            that.minIntervalo = DateFormat(req.min, MASK);
            that.maxIntervalo = DateFormat(req.max, MASK);
        }

        var getAll = function (req) {
            that.operacion = Type.ALL;
            that.usuario = req.usuario;
            that.tipo = req.tipo;
        }

        var getAgregate = function (req) {
            that.operacion = Type.AGREGATE;
            that.usuario = req.usuario;
            that.tipo = req.tipo;
            that.medida = req.calculo;
        }

        switch (arguments[0]) {
            case 0:
                newRegister(arguments[1])
                break;
            case 1:
                getInterval(arguments[1])
                break;
            case 2:
                getAll(arguments[1])
                break;
            case 3:
                getAgregate(arguments[1])
            default:
                break;
        }
    }

    Query(){
        switch (this.operacion) {
            case Type.INSERT:
                return `
                insert into registros 
                values 
                (
                    ${this.usuario}, '${this.timeSet}', '${this.tipo}', ${this.medida}
                )`; 
            case Type.INTERVAL:
                return `
                select id_usuario, registro, medicion 
                from registros where tipo = '${this.tipo}' 
                and id_usuario = ${this.usuario} 
                and registro between '${this.minIntervalo}' and '${this.maxIntervalo}'
                order by 2 asc`;
            case Type.ALL:
                return `
                select id_usuario, registro, medicion 
                from registros where tipo = '${this.tipo}'
                and id_usuario = ${this.usuario} 
                order by 2 asc`;
            case Type.AGREGATE:
                return `
                select id_usuario, ${this.medida}(medicion)
                from registros where tipo = '${this.tipo}' 
                and id_usuario = ${this.usuario} 
                group by 1;`;
            default:
                return '';
        }
    }

    Response(sts, msgerr){
        let response = {
            status: sts,
            res: msgerr
        }
        return response
    }
}

exports.Registro = Registro;
exports.Type = Type