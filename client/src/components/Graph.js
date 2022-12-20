import React from 'react';
import {Chart,ArcElement} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {default as api} from '../store/apiSlice';
import Label from './Label';
import {chart_Data,getTotal} from '../helper/helper'

Chart.register(ArcElement);


  
export default function Graph() {
  const {data,isFetching,isSuccess,isError}=api.useGetLabelsQuery()
    let graphData,typeTotal,expenseTotal=0,savingTotal=0,investTotal=0,totalAmount,rcolor;
    if(isFetching){
      graphData=<div>Fetching</div>
    }
   else if(isSuccess){
    
     
    graphData=<Doughnut {...chart_Data(data)}></Doughnut>
    typeTotal=getTotal(data,'type')
    console.log(typeTotal.length);
    for(let i=0;i<typeTotal.length;i++){
      if(typeTotal[i].type==='Expense'){
              expenseTotal=typeTotal[i].total;
             
          }
      if(typeTotal[i].type==='Savings'){
            savingTotal=typeTotal[i].total;
           
        }
      if(typeTotal[i].type==='Investment'){
          investTotal=typeTotal[i].total;
         
      }
      

    }
    
    totalAmount=savingTotal-(expenseTotal-investTotal);
    if(totalAmount<0){
     rcolor='red';
    }
   
    
    }
    else if(isError){
      graphData=<div>Error</div>
    }
  return (
    <div className='flex justify-content max-w-xs mx-auto'>
        <div className="item">
            <div className="chart relative">
                {graphData}
                <h3 className='mb-4 font-bold title'>Total
                <span className="block text-3xl text-emerald-400" style={{color:rcolor}}>Rs.{totalAmount??0}</span>
                </h3>
            </div>
            <div className="flex flex-col py-10 gap-4">
              <Label></Label>

            </div>
        </div>
      
    </div>
  )
}

