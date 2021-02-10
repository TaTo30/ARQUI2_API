# Documentacion API REST

## **Generalidades**

Para todos los puntos de entrada se retorna de la api rest la misma estructura de datos:

| Key    | Value   | Nota                                                                                                      |
| ------ | ------- | --------------------------------------------------------------------------------------------------------- |
| status | boolean | indica **true** si la transaccion se completo y **false** si hubo un error y la transaccion fue cancelada |
| res    | object  | retorna la respuesta del servidor para cualquier caso indicado por **status**                             |

```json
{
    //Si la operacion se completa
    "status": true,
    "res": //object
}
{
    //Si la operacion **NO** se completa
    "status": false,
    "res": "error message"
}
```

---

## **/newUser**
Ingresa un nuevo usuario a la base de datos

  **INPUTS**:
  
 | Key       | Value Type | Nota                                       |
 | --------- | ---------- | ------------------------------------------ |
 | usuario   | string     |                                            |
 | password  | string     |                                            |
 | nombres   | string     |                                            |
 | apellidos | string     |
 | edad      | integer    |
 | sexo      | char       | Unicos Valores Aceptados: **'M'**, **'F'** |
 | peso      | real       |
 | estatura  | real       |


 **EJEMPLO**:
 
```json
{
    "usuario": "alejo",
    "password": "1563",
    "nombres": "Alejandro Gabriel",
    "apellidos": "Lopez Polanco",
    "edad": 23,
    "sexo": "M",
    //"sexo": "F"
    "peso": 80.1,
    "estatura": 182.2
}
```

**OUTPUT**:

```json
{
    "status": true,
    "res": {
        "oid": 0,
        "rowCount": 1
    }
}
```

---

## **/validateUser**
Valida que un usuario exista en la base de datos

 **INPUTS**:
 
 | Key      | Value Type |
 | -------- | ---------- |
 | usuario  | string     |
 | password | string     |
 
 **EJEMPLO**:
 ```json
 {
     "usuario": "alejo",
     "password": "566"
 }
 ```

**OUTPUT**:
```json
{
    "status": true,
    "res": [
        {
            //Si el usuario y constraseña coinciden
            "result": true
            //Si el usuario y constraseña **NO** coinciden
            //"result": false
        }
    ]
}
```
---

## **/getUser**
Retorna el usuario a buscar y todos sus atletas a cargo si tuviera

 **INPUTS**:
 
 | Key     | Value Type |
 | ------- | ---------- |
 | usuario | string     |
 
 **EJEMPLO**:
 ```json
 {
     "usuario": "alejo"
 }
 ```
**OUTPUT**:

```json
//Si el usuario es es **COACH** se retorna junto a el sus **TRAINEES**, si **NO** es **COACH** solo retorna el usuario

//En cualquier caso el usuario a buscar SIEMPRE sera el index 0 del array que retorn 'RES'
{
    "status": true,
    "res": [
        //usuario o coach
        {
            "id": 6,
            "usuario": "alejo",
            "password": "4d6e4749289c4ec58c0063a90deb3964",
            "nombres": "Alejandro Gabriel",
            "apellidos": "Lopez Polanco",
            "edad": 30,
            "sexo": "M",
            "peso": 80,
            "estatura": 168,
            "coach": null
        },
        //trainees
        {
            "id": 2,
            "usuario": "aldoh",
            "password": "ec6a6536ca304edf844d1d248a4f08dc",
            "nombres": "Aldo Rigoberto",
            "apellidos": "Hernandez Avila",
            "edad": 20,
            "sexo": "M",
            "peso": 71.1,
            "estatura": 171.2,
            "coach": 6
        }
    ]
}
```

---

## **/setCoach**
Asigna un coach a un atleta, esta operacion el atleta que sera entrenado

 **INPUTS**:
 
 | Key     | Value Type | Nota                                                 |
 | ------- | ---------- | ---------------------------------------------------- |
 | trainee | string     | El usuario que esta actualmente logeado en la pagina |
 | coach   | string     | este usuario lo ingresa el **trainee**               |
 
 **EJEMPLO**:
 ```json
 {
     "trainee": "aldoh",
     "coach": "alejo"
 }
 ```

**OUTPUT**:

```json
{
    "status": true,
    "res": {
        "oid": null,
        "rowCount": 1
    }
}
```

---

## **/updateUser**
Actualiza los datos de un usuario

 **INPUTS**:
 
 | Key      | Value Type | Nota                                                           |
 | -------- | ---------- | -------------------------------------------------------------- |
 | usuario  | string     | Este campo solo sirve para buscar el usuario, no se modificara |
 | estatura | real       |
 | edad     | int        |
 | peso     | real       |
 
 **EJEMPLO**:
 
```json
{
    "usuario": "alejo",
    //Si hay un campo que **NO** se va a modificar debera mandarse el dato que tiene actualmente
    "estatura": 168,
    "edad": 30,
    "peso": 80
}
```

**OUTPUT**:
```json
{
    "status": true,
    "res": {
        "oid": null,
        "rowCount": 1
    }
}
```

---

## **/newReg**
Añade un registro nuevo de medicion de cualquier tipo

**INPUT**:

| Key      | Value Type | Nota                                                                                 |
| -------- | ---------- | ------------------------------------------------------------------------------------ |
| usuario  | int        | Este dato es el **ID** del usuario retornado por **/getUser**                        |
| tipo     | char       | Unicos Valores Aceptados: **'T' (temperatura)**, **'O' (oxigeno)**, **'C' (cardio)** |
| time     | timeStamp  | Formato: 'yyyy-mm-dd HH:MM'                                                          |
| medicion | real       |                                                                                      |

**EJEMPLO**:

```json
{
    "usuario": 6,
    "tipo": "O",
    //"tipo": "T",
    //"tipo": "C",
    "time": "2021-02-01 07:00",
    "medicion": 65
}

```

**OUTPUT**:

```json
{
    "status": true,
    "res": {
        "oid": 0,
        "rowCount": 1
    }
}
```

---

## **/regInterval**
Retorna todos los registros de mediciones en un intervalo de tiempo definido por el usuairo

**INPUT**:

| Key     | Value Type | Nota                                                                                 |
| ------- | ---------- | ------------------------------------------------------------------------------------ |
| usuario | int        | Este dato es el **ID** del usuario retornado por **/getUser**                        |
| tipo    | char       | Unicos Valores Aceptados: **'T' (temperatura)**, **'O' (oxigeno)**, **'C' (cardio)** |
| min     | timeStamp  | Formato: 'yyyy-mm-dd HH:MM'                                                          |
| max     | timeStam   | Formato: 'yyyy-mm-dd HH:MM'                                                          |

**EJEMPLO**:
```json
{
    "usuario": 6,
    "tipo": "T",
    //"tipo": "O",
    //"tipo": "C",
    "min": "2021-01-02 00:00",
    "max": "2021-01-02 12:59"
}

```

**OUTPUT**:

```json
{
    "status": true,
    "res": [
        {
            "id_usuario": 6,
            "registro": "2021-01-02T08:25:00.000Z",
            "medicion": 37.9
        },
        {
            "id_usuario": 6,
            "registro": "2021-01-02T10:25:00.000Z",
            "medicion": 37.9
        },
        {
            "id_usuario": 6,
            "registro": "2021-01-02T12:25:00.000Z",
            "medicion": 38
        }
    ]
}
```

---

## **/regAll**
Retorna *todos* los registros de un tipo de medicion

**INPUT**:
| Key     | Value Type | Nota                                                                                 |
| ------- | ---------- | ------------------------------------------------------------------------------------ |
| usuario | int        | Este dato es el **ID** del usuario retornado por **/getUser**                        |
| tipo    | char       | Unicos Valores Aceptados: **'T' (temperatura)**, **'O' (oxigeno)**, **'C' (cardio)** |

**EJEMPLO**:

```json
{
    "usuario": 6,
    "tipo": "T"
    //"tipo": "O"
    //"tipo": "C"
}
```
**OUTPUT**

```json
{
    "status": true,
    "res": [
        {
            "id_usuario": 6,
            "registro": "2021-01-02T08:25:00.000Z",
            "medicion": 37.9
        },
        {
            "id_usuario": 6,
            "registro": "2021-01-02T10:25:00.000Z",
            "medicion": 37.9
        },
        {
            "id_usuario": 6,
            "registro": "2021-01-02T12:25:00.000Z",
            "medicion": 38
        },
        {
            "id_usuario": 6,
            "registro": "2021-01-02T15:25:00.000Z",
            "medicion": 38.5
        },
        {
            "id_usuario": 6,
            "registro": "2021-01-02T18:25:00.000Z",
            "medicion": 37
        }
    ]
}
```

---

## **/regAgregate**
Retorna un calculo de un tipo de medicion

**INPUT**:

| Key     | Value Type | Nota                                                                                   |
| ------- | ---------- | -------------------------------------------------------------------------------------- |
| usuario | int        | Este dato es el **ID** del usuario retornado por **/getUser**                          |
| tipo    | char       | Unicos Valores Aceptados: **'T' (temperatura)**, **'O' (oxigeno)**, **'C' (cardio)**   |
| calculo | string     | Unicos Valores Aceptados: **'avg' (promedio)**, **'min' (minimo)**, **'max' (maximo)** |

**EJEMPLO**:

```json
{
    "usuario": 6,
    "tipo": "O",
    //"tipo": "T",
    //"tipo": "C",
    "calculo": "avg"
    //"calculo": "min"
    //"calculo": "max"
}
```

**OUTPUT**:

```json
{
    "status": true,
    "res": [
        {
            "id_usuario": 6,
            "avg": 89.8
        }
    ]
}
```