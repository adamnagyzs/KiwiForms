import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "./supabase-admin-client.factory";
import {
  SUPABASE_ADMIN_CLIENT,
  SUPABASE_AUTH_CLIENT,
} from "./supabase.constants";

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_ADMIN_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SupabaseClient =>
        createSupabaseAdminClient(
          configService.getOrThrow<string>("SUPABASE_URL"),
          configService.getOrThrow<string>("SUPABASE_SERVICE_ROLE_KEY"),
        ),
    },
    {
      provide: SUPABASE_AUTH_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SupabaseClient =>
        createClient(
          configService.getOrThrow<string>("SUPABASE_URL"),
          configService.getOrThrow<string>("SUPABASE_SERVICE_ROLE_KEY"),
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          },
        ),
    },
  ],
  exports: [SUPABASE_ADMIN_CLIENT, SUPABASE_AUTH_CLIENT],
})
export class SupabaseModule {}
