function SrmMapping(color, srm) {
  return {
    color: "#"+color,
    srm
  }
}


const srms = [SrmMapping("FFE6A0", 1), SrmMapping("FFD979", 2), SrmMapping("FFCB5B", 3), SrmMapping("FFBF43", 4), SrmMapping("FBB223", 5), SrmMapping("F8A600", 6),
  SrmMapping("F49C00", 7), SrmMapping("EB8F00", 8), SrmMapping("E58501", 9), SrmMapping("DE7C01", 10), SrmMapping("D77300", 11), SrmMapping("CF6900", 12),
  SrmMapping("CB6300", 13), SrmMapping("C45900", 14), SrmMapping("BB5101", 15), SrmMapping("B54D00", 16), SrmMapping("B14500", 17), SrmMapping("A63E00", 18),
  SrmMapping("A23700", 19), SrmMapping("9B3300", 20), SrmMapping("952D01", 21), SrmMapping("8E2A00", 22), SrmMapping("892300", 23), SrmMapping("821E00", 24),
  SrmMapping("7B1B00", 25), SrmMapping("771A00", 26), SrmMapping("701401", 27), SrmMapping("6A0F00", 28), SrmMapping("660D01", 29), SrmMapping("5E0B00", 30),
  SrmMapping("5A0B02", 31), SrmMapping("600A03", 32), SrmMapping("520908", 33), SrmMapping("4C0605", 34), SrmMapping("470607", 35), SrmMapping("440607", 36),
  SrmMapping("3F0808", 37), SrmMapping("3B0608", 38), SrmMapping("3A080B", 39), SrmMapping("36090A", 40), SrmMapping("000000", 41)
]

export const getSrmColor = function(srm) {
  let srmObj = srms.find(s => s.srm === srm)
  return srmObj ? srmObj.color : undefined
}
