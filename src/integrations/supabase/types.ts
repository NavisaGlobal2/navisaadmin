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
      client_admin_assignments: {
        Row: {
          client_admin_id: string
          created_at: string
          id: string
          users_assigned: Json[] | null
        }
        Insert: {
          client_admin_id?: string
          created_at?: string
          id?: string
          users_assigned?: Json[] | null
        }
        Update: {
          client_admin_id?: string
          created_at?: string
          id?: string
          users_assigned?: Json[] | null
        }
        Relationships: []
      }
      client_admins: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          password: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      client_assessments: {
        Row: {
          assessment_data: Json | null
          client_id: string | null
          created_at: string
          email: string | null
          id: string
          personal: Json | null
          updated_at: string | null
        }
        Insert: {
          assessment_data?: Json | null
          client_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          personal?: Json | null
          updated_at?: string | null
        }
        Update: {
          assessment_data?: Json | null
          client_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          personal?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      consultation_bookings: {
        Row: {
          created_at: string
          end_time: string
          id: string
          start_time: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          start_time: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          start_time?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      document_templates: {
        Row: {
          created_at: string
          document_type: string
          id: string
          template_url: string | null
          updated_at: string
          visa_type: string
        }
        Insert: {
          created_at?: string
          document_type: string
          id?: string
          template_url?: string | null
          updated_at?: string
          visa_type: string
        }
        Update: {
          created_at?: string
          document_type?: string
          id?: string
          template_url?: string | null
          updated_at?: string
          visa_type?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          feedback: string | null
          file_path: string
          id: string
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_type: string
          feedback?: string | null
          file_path: string
          id?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          feedback?: string | null
          file_path?: string
          id?: string
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      eligibility_verifications: {
        Row: {
          claimed_by_user_id: string | null
          created_at: string
          guest_email: string | null
          id: string
          is_guest: boolean | null
          status: string
          updated_at: string
          user_id: string | null
          verification_data: Json
        }
        Insert: {
          claimed_by_user_id?: string | null
          created_at?: string
          guest_email?: string | null
          id?: string
          is_guest?: boolean | null
          status: string
          updated_at?: string
          user_id?: string | null
          verification_data: Json
        }
        Update: {
          claimed_by_user_id?: string | null
          created_at?: string
          guest_email?: string | null
          id?: string
          is_guest?: boolean | null
          status?: string
          updated_at?: string
          user_id?: string | null
          verification_data?: Json
        }
        Relationships: []
      }
      pathway_assessments: {
        Row: {
          assessment_data: Json
          created_at: string
          id: string
          pathway: Database["public"]["Enums"]["visa_pathway_type"]
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assessment_data: Json
          created_at?: string
          id?: string
          pathway: Database["public"]["Enums"]["visa_pathway_type"]
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assessment_data?: Json
          created_at?: string
          id?: string
          pathway?: Database["public"]["Enums"]["visa_pathway_type"]
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pathway_questions: {
        Row: {
          created_at: string
          field_type: string
          id: string
          options: Json | null
          pathway: Database["public"]["Enums"]["visa_pathway_type"]
          question: string
          question_order: number
          required: boolean | null
          section: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          field_type: string
          id?: string
          options?: Json | null
          pathway: Database["public"]["Enums"]["visa_pathway_type"]
          question: string
          question_order: number
          required?: boolean | null
          section: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          field_type?: string
          id?: string
          options?: Json | null
          pathway?: Database["public"]["Enums"]["visa_pathway_type"]
          question?: string
          question_order?: number
          required?: boolean | null
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      super_admins: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      visa_criteria: {
        Row: {
          achievement_points: Json
          country: string
          created_at: string
          education_points: Json
          experience_points: Json
          id: string
          program_criteria: Json
          updated_at: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Insert: {
          achievement_points: Json
          country: string
          created_at?: string
          education_points: Json
          experience_points: Json
          id?: string
          program_criteria: Json
          updated_at?: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Update: {
          achievement_points?: Json
          country?: string
          created_at?: string
          education_points?: Json
          experience_points?: Json
          id?: string
          program_criteria?: Json
          updated_at?: string
          visa_type?: Database["public"]["Enums"]["visa_type"]
        }
        Relationships: []
      }
      visas: {
        Row: {
          created_at: string
          criteras: Json | null
          id: string
          visa_name: string
        }
        Insert: {
          created_at?: string
          criteras?: Json | null
          id?: string
          visa_name: string
        }
        Update: {
          created_at?: string
          criteras?: Json | null
          id?: string
          visa_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      visa_name:
        | "UK Global Talent Visa"
        | "US EB-1/EB-2 VISA"
        | "CANADA EXPRESS ENTRY"
        | "DUBAI GOLDEN VISA"
      visa_pathway_type:
        | "DIGITAL_TECHNOLOGY"
        | "ARTS_CULTURE"
        | "ACADEMIA_RESEARCH"
      visa_type:
        | "uk_global_talent"
        | "us_eb1"
        | "canada_express_entry"
        | "dubai_golden"
        | "eu_blue_card"
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
