module.exports = {
  repairZero(num) {
    return num < 10 ? ("0" + num) : num
  }, formatMs20bj(total) {
    var h = this.repairZero(Math.floor(total / 3600))
    var m = this.repairZero(Math.floor((total - h * 3600) / 60))
    var s = this.repairZero(Math.floor(total - h * 3600 - m * 60))
    return {
      h, m, s
    }
  },
}