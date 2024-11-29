import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { SupplierFormValues } from "./types"

interface PersonalFieldsProps {
  form: UseFormReturn<SupplierFormValues>
}

export function PersonalFields({ form }: PersonalFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="tipoPessoa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Pessoa</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de pessoa" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="PF">Pessoa Física</SelectItem>
                <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cpfCnpj"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CPF/CNPJ</FormLabel>
            <FormControl>
              <Input {...field} type="text" inputMode="numeric" pattern="[0-9]*" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inscricaoMunicipal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inscrição Municipal</FormLabel>
            <FormControl>
              <Input {...field} type="text" inputMode="numeric" pattern="[0-9]*" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inscricaoEstadual"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inscrição Estadual</FormLabel>
            <FormControl>
              <Input {...field} type="text" inputMode="numeric" pattern="[0-9]*" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="telefone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefone</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}