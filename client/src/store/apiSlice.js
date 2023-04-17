import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURi='https://vercel.com/atulp1109/expense-tracker/2FzTYCeyvdvETgbjfunVjmJUfzNP';
export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:baseURi
    }),
    endpoints:builder=>({
        getCategories:builder.query({
            query:()=>'/api/categories',
            providesTags:['categories']
        }),

        getLabels:builder.query({
            query:()=>'/api/labels',
            providesTags:['transaction']
        }),

        addTransaction:builder.mutation({
            query:(initialTransaction)=>({
                url:'/api/transaction',
                method:"POST",
                body:initialTransaction
                
            }),
            invalidatesTags:['transaction']
        }),

        deleteTransaction:builder.mutation({
            query:(recordId)=>({
                url:'/api/transaction',
                method:"DELETE",
                body:recordId
            }),
            invalidatesTags:['transaction']
        })
    })
})

export default apiSlice;