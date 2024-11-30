import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "./types"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { Loader2, FileText, Upload, AlignLeft } from "lucide-react"

interface DocumentFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function DocumentFields({ form }: DocumentFieldsProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'documentUrl' | 'paymentProofUrl') => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('financial_documents')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('financial_documents')
        .getPublicUrl(filePath)

      form.setValue(fieldName, publicUrl)
      toast.success('Arquivo enviado com sucesso!')
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Erro ao enviar arquivo')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="documentNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Número do Documento
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: NF-e 123456" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documentType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tipo de Documento
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="nfe">NF-e</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="contrato">Contrato</SelectItem>
                <SelectItem value="recibo">Recibo</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <AlignLeft className="h-4 w-4" />
              Descrição/Observação
            </FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Detalhes do pagamento" className="min-h-[60px] resize-none" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documentUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documento Fiscal
            </FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileUpload(e, 'documentUrl')}
                  disabled={isUploading}
                  className="h-9"
                />
                {field.value && (
                  <a
                    href={field.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Ver documento
                  </a>
                )}
                {isUploading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando arquivo...</span>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="paymentProofUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Comprovante de Pagamento
            </FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileUpload(e, 'paymentProofUrl')}
                  disabled={isUploading}
                  className="h-9"
                />
                {field.value && (
                  <a
                    href={field.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    Ver comprovante
                  </a>
                )}
                {isUploading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando arquivo...</span>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}