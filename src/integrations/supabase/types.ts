export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts_payable: {
        Row: {
          accounting_plan: string | null
          adjusted_due_date: string | null
          amount: number
          associated_project: string | null
          bank_account: string | null
          bank_reconciliation_status: string | null
          barcode: string | null
          category: string | null
          cost_center: string | null
          created_at: string
          description: string
          discount_amount: number | null
          document_number: string | null
          document_type: string | null
          document_url: string | null
          due_date: string
          id: string
          interest_amount: number | null
          internal_notes: string | null
          issue_date: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          notes: string | null
          occurrence: string | null
          original_amount: number | null
          original_due_date: string | null
          owner_id: string
          payment_date: string | null
          payment_method: string | null
          payment_proof_url: string | null
          priority: string | null
          reference_period: string | null
          remaining_balance: number | null
          status: string
          subcategory: string | null
          supplier_id: string | null
        }
        Insert: {
          accounting_plan?: string | null
          adjusted_due_date?: string | null
          amount: number
          associated_project?: string | null
          bank_account?: string | null
          bank_reconciliation_status?: string | null
          barcode?: string | null
          category?: string | null
          cost_center?: string | null
          created_at?: string
          description: string
          discount_amount?: number | null
          document_number?: string | null
          document_type?: string | null
          document_url?: string | null
          due_date: string
          id?: string
          interest_amount?: number | null
          internal_notes?: string | null
          issue_date?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          notes?: string | null
          occurrence?: string | null
          original_amount?: number | null
          original_due_date?: string | null
          owner_id: string
          payment_date?: string | null
          payment_method?: string | null
          payment_proof_url?: string | null
          priority?: string | null
          reference_period?: string | null
          remaining_balance?: number | null
          status?: string
          subcategory?: string | null
          supplier_id?: string | null
        }
        Update: {
          accounting_plan?: string | null
          adjusted_due_date?: string | null
          amount?: number
          associated_project?: string | null
          bank_account?: string | null
          bank_reconciliation_status?: string | null
          barcode?: string | null
          category?: string | null
          cost_center?: string | null
          created_at?: string
          description?: string
          discount_amount?: number | null
          document_number?: string | null
          document_type?: string | null
          document_url?: string | null
          due_date?: string
          id?: string
          interest_amount?: number | null
          internal_notes?: string | null
          issue_date?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          notes?: string | null
          occurrence?: string | null
          original_amount?: number | null
          original_due_date?: string | null
          owner_id?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_proof_url?: string | null
          priority?: string | null
          reference_period?: string | null
          remaining_balance?: number | null
          status?: string
          subcategory?: string | null
          supplier_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_payable_last_modified_by_fkey"
            columns: ["last_modified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_payable_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_payable_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      accounts_receivable: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string
          description: string
          document_number: string | null
          due_date: string
          id: string
          notes: string | null
          owner_id: string
          payment_date: string | null
          payment_method: string | null
          status: string
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string
          description: string
          document_number?: string | null
          due_date: string
          id?: string
          notes?: string | null
          owner_id: string
          payment_date?: string | null
          payment_method?: string | null
          status?: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string
          description?: string
          document_number?: string | null
          due_date?: string
          id?: string
          notes?: string | null
          owner_id?: string
          payment_date?: string | null
          payment_method?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_receivable_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_receivable_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          bairro: string
          cep: string
          cidade: string
          cidade_ibge_id: number
          complemento: string | null
          cpf_cnpj: string
          created_at: string
          email: string
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          logradouro: string
          nome: string
          numero: string
          owner_id: string
          pais: string
          telefone: string
          tipo_pessoa: string
          uf: string
        }
        Insert: {
          bairro: string
          cep: string
          cidade: string
          cidade_ibge_id: number
          complemento?: string | null
          cpf_cnpj: string
          created_at?: string
          email: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logradouro: string
          nome: string
          numero: string
          owner_id: string
          pais: string
          telefone: string
          tipo_pessoa: string
          uf: string
        }
        Update: {
          bairro?: string
          cep?: string
          cidade?: string
          cidade_ibge_id?: number
          complemento?: string | null
          cpf_cnpj?: string
          created_at?: string
          email?: string
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          logradouro?: string
          nome?: string
          numero?: string
          owner_id?: string
          pais?: string
          telefone?: string
          tipo_pessoa?: string
          uf?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          ambiente: string | null
          bairro: string | null
          certificado_password: string | null
          certificado_path: string | null
          city: string | null
          cnpj: string
          complemento: string | null
          created_at: string
          csc_nfce_producao: string | null
          discrimina_impostos: boolean | null
          email: string | null
          enviar_email_destinatario: boolean | null
          habilita_nfce: boolean | null
          habilita_nfe: boolean | null
          id: string
          id_token_nfce_producao: string | null
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          integranotas_id: string | null
          is_active: boolean | null
          logradouro: string | null
          nome: string
          nome_fantasia: string | null
          numero: string | null
          owner_id: string
          phone: string | null
          regime_tributario: string | null
          state: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          ambiente?: string | null
          bairro?: string | null
          certificado_password?: string | null
          certificado_path?: string | null
          city?: string | null
          cnpj: string
          complemento?: string | null
          created_at?: string
          csc_nfce_producao?: string | null
          discrimina_impostos?: boolean | null
          email?: string | null
          enviar_email_destinatario?: boolean | null
          habilita_nfce?: boolean | null
          habilita_nfe?: boolean | null
          id?: string
          id_token_nfce_producao?: string | null
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          integranotas_id?: string | null
          is_active?: boolean | null
          logradouro?: string | null
          nome: string
          nome_fantasia?: string | null
          numero?: string | null
          owner_id: string
          phone?: string | null
          regime_tributario?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          ambiente?: string | null
          bairro?: string | null
          certificado_password?: string | null
          certificado_path?: string | null
          city?: string | null
          cnpj?: string
          complemento?: string | null
          created_at?: string
          csc_nfce_producao?: string | null
          discrimina_impostos?: boolean | null
          email?: string | null
          enviar_email_destinatario?: boolean | null
          habilita_nfce?: boolean | null
          habilita_nfe?: boolean | null
          id?: string
          id_token_nfce_producao?: string | null
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          integranotas_id?: string | null
          is_active?: boolean | null
          logradouro?: string | null
          nome?: string
          nome_fantasia?: string | null
          numero?: string | null
          owner_id?: string
          phone?: string | null
          regime_tributario?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          cpf: string | null
          created_at: string
          id: string
          name: string | null
          whatsapp: string | null
        }
        Insert: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          id: string
          name?: string | null
          whatsapp?: string | null
        }
        Update: {
          avatar_url?: string | null
          cpf?: string | null
          created_at?: string
          id?: string
          name?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          agencia: string | null
          bairro: string
          banco: string | null
          categoria: string | null
          cep: string
          chave_pix: string | null
          cidade: string
          cidade_ibge_id: number
          complemento: string | null
          condicoes_pagamento: string | null
          conta: string | null
          contrato_url: string | null
          cpf_cnpj: string
          created_at: string
          email: string
          email_financeiro: string | null
          endereco_correspondencia_bairro: string | null
          endereco_correspondencia_cep: string | null
          endereco_correspondencia_cidade: string | null
          endereco_correspondencia_complemento: string | null
          endereco_correspondencia_logradouro: string | null
          endereco_correspondencia_numero: string | null
          endereco_correspondencia_pais: string | null
          endereco_correspondencia_uf: string | null
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          isento_ie: boolean | null
          limite_credito: number | null
          logradouro: string
          nome: string
          nome_fantasia: string | null
          numero: string
          owner_id: string
          pais: string
          prazo_entrega: string | null
          produtos_servicos: string | null
          ramo_atividade: string | null
          responsavel_funcao: string | null
          responsavel_nome: string | null
          telefone: string
          telefone_fixo: string | null
          tipo_conta: string | null
          tipo_pessoa: string
          titular_conta: string | null
          uf: string
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          agencia?: string | null
          bairro: string
          banco?: string | null
          categoria?: string | null
          cep: string
          chave_pix?: string | null
          cidade: string
          cidade_ibge_id: number
          complemento?: string | null
          condicoes_pagamento?: string | null
          conta?: string | null
          contrato_url?: string | null
          cpf_cnpj: string
          created_at?: string
          email: string
          email_financeiro?: string | null
          endereco_correspondencia_bairro?: string | null
          endereco_correspondencia_cep?: string | null
          endereco_correspondencia_cidade?: string | null
          endereco_correspondencia_complemento?: string | null
          endereco_correspondencia_logradouro?: string | null
          endereco_correspondencia_numero?: string | null
          endereco_correspondencia_pais?: string | null
          endereco_correspondencia_uf?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          isento_ie?: boolean | null
          limite_credito?: number | null
          logradouro: string
          nome: string
          nome_fantasia?: string | null
          numero: string
          owner_id: string
          pais: string
          prazo_entrega?: string | null
          produtos_servicos?: string | null
          ramo_atividade?: string | null
          responsavel_funcao?: string | null
          responsavel_nome?: string | null
          telefone: string
          telefone_fixo?: string | null
          tipo_conta?: string | null
          tipo_pessoa: string
          titular_conta?: string | null
          uf: string
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          agencia?: string | null
          bairro?: string
          banco?: string | null
          categoria?: string | null
          cep?: string
          chave_pix?: string | null
          cidade?: string
          cidade_ibge_id?: number
          complemento?: string | null
          condicoes_pagamento?: string | null
          conta?: string | null
          contrato_url?: string | null
          cpf_cnpj?: string
          created_at?: string
          email?: string
          email_financeiro?: string | null
          endereco_correspondencia_bairro?: string | null
          endereco_correspondencia_cep?: string | null
          endereco_correspondencia_cidade?: string | null
          endereco_correspondencia_complemento?: string | null
          endereco_correspondencia_logradouro?: string | null
          endereco_correspondencia_numero?: string | null
          endereco_correspondencia_pais?: string | null
          endereco_correspondencia_uf?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          isento_ie?: boolean | null
          limite_credito?: number | null
          logradouro?: string
          nome?: string
          nome_fantasia?: string | null
          numero?: string
          owner_id?: string
          pais?: string
          prazo_entrega?: string | null
          produtos_servicos?: string | null
          ramo_atividade?: string | null
          responsavel_funcao?: string | null
          responsavel_nome?: string | null
          telefone?: string
          telefone_fixo?: string | null
          tipo_conta?: string | null
          tipo_pessoa?: string
          titular_conta?: string | null
          uf?: string
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "suppliers_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
