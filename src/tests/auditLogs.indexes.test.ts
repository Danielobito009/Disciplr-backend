import { describe, it, expect, beforeAll } from '@jest/globals'
import { db } from '../db/knex.js'

describe('Audit Logs Indexes', () => {
  beforeAll(async () => {
    const exists = await db.schema.hasTable('audit_logs')
    expect(exists).toBe(true)
  })

  it('has composite index on organization_id and created_at', async () => {
    const rows = await db('pg_indexes').select('indexname', 'indexdef').where({ tablename: 'audit_logs' })
    const found = rows.some((r: any) => {
      const def = String(r.indexdef || '').toLowerCase()
      return def.includes('organization_id') && def.includes('created_at')
    })

    expect(found).toBe(true)
  })
})
