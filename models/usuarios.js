const md5 = require('md5')

var Type = {
    NEWUSER: 1,
    VALIDATEUSER: 2,
    GETUSER: 3,
    SETCOACH: 4
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
        this.type = 0;
        this.coach = '';
    }

    Data(){
        var that = this;
        var newUser = function (reqBody) {
            that.type = Type.NEWUSER;
            that.usuario = reqBody.usuario;
            that.password = md5(reqBody.password);
            that.nombres = reqBody.nombres;
            that.apellidos = reqBody.apellidos;
            that.edad = reqBody.edad;
            that.sexo = reqBody.sexo;
            that.peso = reqBody.peso;
            that.estatura = reqBody.estatura; 
        }

        var validateUser = function (usr, psw) {
            that.type = Type.VALIDATEUSER;
            that.usuario = usr;
            that.password = md5(psw);
        }

        var getUser = function (usr) {
            that.type = Type.GETUSER;
            that.usuario = usr;
        }

        var setCoach = function (trainee, coach) {
            that.type = Type.SETCOACH;
            that.usuario = trainee;
            that.coach = coach;
        }

        if (arguments.length === 1) {
            if (typeof arguments[0] === 'object') {
                newUser(arguments[0])
            } else if (typeof arguments[0] === 'string') {
                getUser(arguments[0])
            }            
        } else if (arguments.length === 2) {
            validateUser(arguments[0], arguments[1])          
        } else if (arguments.length === 3){
            setCoach(arguments[0], arguments[1])
        }
    }

    Query(){
        if (this.type == Type.NEWUSER) {
            return `
            insert into usuarios 
            (
                usuario, password, nombres, apellidos, edad, sexo, peso, estatura
            )
            values
            (
                '${this.usuario}', '${this.password}', '${this.nombres}', '${this.apellidos}', ${this.edad}, '${this.sexo}', ${this.peso}, ${this.estatura}
            )`
        } else if (this.type == Type.VALIDATEUSER) {
            return `
            select exists
            (
                select 1 from usuarios 
                where usuario = '${this.usuario}' and password = '${this.password}'
            ) as result;`
        } else if (this.type == Type.GETUSER){
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
        } else if (this.type == Type.SETCOACH){
            return `
            update usuarios set coach = 
            (
                select id from usuarios where usuario = '${this.coach}'
            )
            where usuario = '${this.usuario}'`
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

module.exports = Usuario;
