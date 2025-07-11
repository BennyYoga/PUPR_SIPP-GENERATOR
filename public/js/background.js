function updateIcon(tabId, url) {
  const isActive = !url.includes('abc.com')

  chrome.action.setIcon({
    tabId: tabId,
    path: isActive
      ? {
          16: '../images/logo-16.png',
          48: '../images/logo-32.png',
          128: '../images/logo-64.png',
        }
      : {
          16: '../images/logo-inactive-16.png',
          48: '../images/logo-inactive-32.png',
          128: '../images/logo-inactive-64.png',
        },
  })

  chrome.action.setTitle({
    tabId: tabId,
    title: isActive ? 'Tab Aktif' : 'Tab Tidak Aktif',
  })
}

// Ketika user berpindah tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId)
  updateIcon(tab.id, tab.url || '')
})

// Ketika tab selesai dimuat ulang
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateIcon(tabId, tab.url || '')
  }
})
