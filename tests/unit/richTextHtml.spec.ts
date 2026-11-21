import { convertLexicalToHTMLAsync } from '@payloadcms/richtext-lexical/html-async'
import { describe, expect, it } from 'vitest'

/**
 * The `<field>Html` siblings (src/fields/richTextHtml.ts) are inserted into
 * public pages as is, so the converter they use must escape text and
 * neutralize unsafe link schemes. Payload 3.79 did neither; this guards
 * against a downgrade or a regression in a future version.
 */
const link = (url: string) => ({
  type: 'link',
  version: 3,
  fields: { linkType: 'custom', url, newTab: false },
  children: [{ type: 'text', text: 'x', format: 0, version: 1 }],
})

describe('rich text HTML', () => {
  it('escapes text and neutralizes unsafe links', async () => {
    const html = await convertLexicalToHTMLAsync({
      data: {
        root: {
          type: 'root',
          version: 1,
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                link('javascript:alert(1)'),
                link(' JaVaScRiPt:alert(1)'),
                link('java\tscript:alert(1)'),
                link('data:text/html,<script>alert(1)</script>'),
                link('https://example.org/?a="><b>'),
                { type: 'text', text: '<img src=x onerror=alert(1)>', format: 0, version: 1 },
              ],
            },
          ],
        },
      } as any,
    })

    expect(html).not.toMatch(/javascript:/i)
    expect(html).not.toContain('data:text/html')
    expect(html).not.toContain('<img')
    expect(html).not.toContain('"><b>')
    expect(html).toContain('href="https://example.org/')
  })
})
