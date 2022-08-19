import { v4 as uuid } from 'uuid';


class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        this.id = uuid();
        this.desc = desc;
        this.completadoEn = null
    }
}

export {
    Tarea
    
} 