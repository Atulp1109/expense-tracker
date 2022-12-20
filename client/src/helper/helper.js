import _ from 'lodash';

export function getTotal(transaction,type){
    let sum =_(transaction)
                .groupBy("type")
                .map((objs,key)=>{
                  if(!type)  return _.sumBy(objs,'amount');
                  return {
                    'type':key,
                    'color':objs[0].color,
                    'total':_.sumBy(objs,'amount')
                  }
                })
                .value()
    return sum;
}

export function getLabels(transaction){
    let typeTotal=getTotal(transaction,'type');
    let total=_.sum(getTotal(transaction))

    let percent=_(typeTotal)
                    .map(objs=>_.assign(objs,{percent:(100*objs.total)/total}))
                    .value()

    return percent;
   
}


export function chart_Data(transaction,custom){
    let bg=_.map(transaction,a=>a.color)
    bg=_.uniq(bg)
    let dataValue=getTotal(transaction)
    const config={
        data:{
          datasets: [{
          
            data: dataValue,
            backgroundColor: bg,
            hoverOffset: 4,
            borderRadius:30,
            spacing:10 
          }]
        },
        options:{
          cutout:115
    
        }
      }
      return custom??config;
}

