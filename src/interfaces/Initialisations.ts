import { INpc, IMonster, IModel, IMap } from './Models';

const Monster: IMonster = {
    id: 0,
    name: "",
    alignment: 0,
    passive_perception: 0,
    hit_points: 0
}

const Npc: INpc = {
    id: 0,
    name: "",
    monster: Monster
}


const Model: IModel = {
    id: 0,
    name: ""
}

const Map: IMap = {
    id: 0,
    name: '',
    image_url: '',
    buildings: []
}

export default {
    Model,
    Monster,
    Npc,
    Map
}