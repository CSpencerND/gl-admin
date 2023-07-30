import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

import type { Control } from "react-hook-form"

type FormEntryProps = {
    control: Control<any>
    name: string
    label: string
    isLoading: boolean
    floating?: boolean
}

export const FormEntry: React.FC<FormEntryProps> = ({ control, name, label, isLoading, floating }) => {
    if (floating) {
        return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="relative my-1">
                        <FormControl>
                            <Input
                                placeholder={label}
                                className={cn("!placeholder-transparent")}
                                disabled={isLoading}
                                {...field}
                            />
                        </FormControl>
                        <FormLabel
                            className={cn(
                                "absolute -top-5 left-0 ml-1.5 bg-background px-1.5 text-sm font-bold text-ring transition-all",
                                "peer-placeholder-shown:top-0 peer-placeholder-shown:text-base",
                                "peer-focus:-top-5 peer-focus:text-sm peer-focus:text-ring"
                            )}
                        >
                            {label}
                        </FormLabel>
                    </FormItem>
                )}
            />
        )
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="ml-3">{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={label}
                            disabled={isLoading}
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}
