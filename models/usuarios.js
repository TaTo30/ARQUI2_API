const md5 = require('md5')

var Type = {
    NEWUSER: 1,
    VALIDATEUSER: 2,
    GETUSER: 3,
    SETCOACH: 4,
    UPDATEUSER: 5
}

class Usuario{
    constructor(){ 
        this.id = 0;
        this.usuario = '';
        this.password ='';
        this.nombres = '';
        this.apellidos = '';
        this.edad = 0;
        this.sexo = '';
        this.peso = 0;
        this.estatura = 0; 
        this.operacion = 0;
        this.coach = '';
    }

    Data(){
        var that = this;
        var newUser = function (req) {
            that.operacion = Type.NEWUSER;
            that.usuario = req.usuario;
            that.password = md5(req.password);
            that.nombres = req.nombres;
            that.apellidos = req.apellidos;
            that.edad = req.edad;
            that.sexo = req.sexo;
            that.peso = req.peso;
            that.estatura = req.estatura; 
        }

        var validateUser = function (req) {
            that.operacion = Type.VALIDATEUSER;
            that.usuario = req.usuario;
            that.password = md5(req.password);
        }

        var getUser = function (req) {
            that.operacion = Type.GETUSER;
            that.usuario = req.usuario;
        }

        var setCoach = function (req) {
            that.operacion = Type.SETCOACH;
            that.usuario = req.trainee;
            that.coach = req.coach;
        }

        var updateUser = function (req) {
            that.operacion = Type.UPDATEUSER;
            that.usuario = req.usuario;
            that.estatura = req.estatura;
            that.edad = req.edad;
            that.peso = req.peso;
        }

        switch (arguments[0]) {
            case 1:
                newUser(arguments[1])
                break;
            case 2:
                validateUser(arguments[1])
                break;
            case 3:
                getUser(arguments[1])
                break;
            case 4:
                setCoach(arguments[1])
                break;
            case 5:
                updateUser(arguments[1])
                break;
            default:
                break;
        }
    }

    Query(){
        switch (this.operacion) {
            case Type.NEWUSER:
                return `
                insert into usuarios 
                (
                    usuario, password, nombres, apellidos, edad, sexo, peso, estatura
                )
                values
                (
                    '${this.usuario}', '${this.password}', '${this.nombres}', '${this.apellidos}', ${this.edad}, '${this.sexo}', ${this.peso}, ${this.estatura}
                )`
            case Type.GETUSER:
                return `
                (
                    select * from usuarios A where usuario = '${this.usuario}'
                )
                union
                (
                    select B.* from usuarios A
                    inner join usuarios B on A.id = B.coach
                    where A.usuario = '${this.usuario}'
                )order by coach DESC;`
            case Type.VALIDATEUSER:
                return `
                select exists
                (
                    select 1 from usuarios 
                    where usuario = '${this.usuario}' and password = '${this.password}'
                ) as result;`
            case Type.SETCOACH:
                return `
                update usuarios set coach = 
                (
                    select id from usuarios where usuario = '${this.coach}'
                )
                where usuario = '${this.usuario}'`
            
            case Type.UPDATEUSER:
                return `
                update usuarios set edad = ${this.edad}, peso = ${this.peso}, estatura = ${this.estatura}
                where usuario = '${this.usuario}'
                `
            default:
                break;
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

exports.Usuario = Usuario;
exports.Type = Type
