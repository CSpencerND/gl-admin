import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import type { Control } from "react-hook-form"

type FormEntryProps = React.PropsWithChildren<{
    type?: React.HTMLInputTypeAttribute
    control: Control<any>
    name: string
    label: string
    isLoading?: boolean
    // floating?: boolean
}>

export const FormEntry: React.FC<FormEntryProps> = (props) => {
    const { type, control, name, label, isLoading } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="ml-3">{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={label}
                            disabled={isLoading}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

// if (floating) {
//     return (
//         <FormField
//             control={control}
//             name={name}
//             render={({ field }) => (
//                 <FormItem className="relative my-1">
//                     <FormControl>
//                         <Input
//                             type={type}
//                             placeholder={label}
//                             className="!placeholder-transparent h-12 bg-card"
//                             disabled={isLoading}
//                             {...field}
//                         />
//                     </FormControl>
//                     <FormLabel
//                         className={cn(
//                             "absolute -top-5 left-0 ml-1.5 bg-card px-1.5 text-sm font-semibold text-muted-foreground transition-all",
//                             "peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:cursor-text",
//                             "peer-focus:-top-5 peer-focus:text-sm peer-focus:text-ring"
//                         )}
//                     >
//                         {label}
//                     </FormLabel>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     )
// }
