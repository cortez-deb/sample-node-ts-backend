import { object, string, number, TypeOf, array } from "zod";

const createOrder= {
    body: object({
        first_name: string({
            required_error: "first_name is required"
        }),
        last_name: string({
            required_error: "last_name is required"
        }),
        email: string({
            required_error: "email is required"
        }).email(
            "Please provide a valid email "
        )
        ,
        password: string({
            required_error: "password is required"
        })
})
}
const signInSchema= object(
    {
        body: object({
             email: string({
                 required_error: "email is required"
             }).email(
                 "Please provide a valid email "
             )
             ,
             password: string({
                 required_error: "password is required"
             })
     })
     }
)
 

 const createUserSchema = object({
    ...createOrder
});

 
export const UserSchema = {
    createOrderSchema: createUserSchema,
    signInSchema: signInSchema
}