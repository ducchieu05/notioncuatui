import type * as types from 'notion-types'
import cs from 'classnames'
import * as React from 'react'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { MoonIcon } from '@/lib/icons/moon'
import { SunIcon } from '@/lib/icons/sun'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <MoonIcon /> : <SunIcon />}
    </div>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

 // if (navigationStyle === 'default') {
   // return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
      // <Breadcrumbs block={block} rootOnly={true} />
        <div style={{ fontWeight: 600 }}>
  {block.properties?.title?.[0]?.[0]}
</div>

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link?.pageId && !link?.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}

        {/* MENU MỚI */}
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginRight: '12px'
}}>
  <components.Link
    href="/about"
    className={cs(styles.navLink, 'breadcrumb', 'button')}
  >
    About
  </components.Link>

  <components.Link
    href="/contact"
    className={cs(styles.navLink, 'breadcrumb', 'button')}
  >
    Contact
  </components.Link>
</div>

{/* DARK MODE */}
<ToggleThemeButton />

{/* SEARCH */}
{isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
