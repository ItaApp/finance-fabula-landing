import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { SupplierFormValues } from "./types"
import { useState, useEffect } from "react"

interface State {
  id: number
  sigla: string
  nome: string
}

interface City {
  id: number
  nome: string
}

interface CorrespondenceAddressFieldsProps {
  form: UseFormReturn<SupplierFormValues>
}

export function CorrespondenceAddressFields({ form }: CorrespondenceAddressFieldsProps) {
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedState, setSelectedState] = useState("")

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => setStates(data))
  }, [])

  useEffect(() => {
    if (selectedState) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
      )
        .then((response) => response.json())
        .then((data) => setCities(data))
    }
  }, [selectedState])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Endereço de Correspondência</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="enderecoCorrespondenciaCep"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">CEP</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaPais"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">País</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaUf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">UF</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setSelectedState(value)
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.sigla}>
                      {state.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaCidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Cidade</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.nome}>
                      {city.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaLogradouro"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Logradouro</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaNumero"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Número</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaComplemento"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Complemento</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enderecoCorrespondenciaBairro"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Bairro</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}