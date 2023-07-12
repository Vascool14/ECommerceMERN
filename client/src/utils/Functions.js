import { MONTHS } from './Constants';   

export function getMonthAndDate(d){
    return `${MONTHS[new Date(parseInt(d)).getMonth()]} ${new Date(parseInt(d)).getDate()}`
}

export function turnDate(d) {
    d = new Date(d);
    if(new Date().getTime() - d < 86400000 && new Date().getTime().getDate == d.getDate()) return `today at ${(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())}`;
    return `${d.getDate()+' '+MONTHS[d.getMonth()]+' at '+(d.getHours()>9?d.getHours():'0'+d.getHours())+':'+(d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes())}`;
}

export function getOnlineStatus(d) {
    d = new Date(d).getTime()
    return ((new Date().getTime()-d)<80000)?'active now':
    ((new Date().getTime()-d)<3600000)?`last seen ${Math.floor((new Date().getTime()-d)/60000)} minute${((new Date().getTime()-d)/60000)<=2?'':'s'} ago`:
    ((new Date().getTime()-d)<86400000)?`last seen ${Math.floor((new Date().getTime()-d)/3600000)} hour${((new Date().getTime()-d)/3600000)<=2?'':'s'} ago`:
    `last seen ${turnDate(d)}`;
}

export function hoursAndMinutes(d){
    d = new Date(d);
    return `${d.getHours()>9?d.getHours():'0'+d.getHours()}:${d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes()}`;
}