let data: number | String;
data="suresh";
data=23;

interface ICar{
    color:string;
    model:string;
    topspeed:number;
}

const car1:ICar={
    color:'blue',
    model:'bmw',
    topspeed:20
};

const car2:ICar={
    color:'red',
    model:'Toyota',
    topspeed:25
};

const multiply = (x:number, y:number):string => {
    return (x * y).toString();
};
