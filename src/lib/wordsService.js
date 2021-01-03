import { USER_ROLE_LEFT, USER_ROLE_RIGHT } from '@/data/constants'

const ROW_SEPARATOR = '\n'
const COL_SEPARATOR = ';'

export class WordsService {
  static generateIndexes ({
    width,
    height
  }) {
    const indexes = []

    for (let i = 0, n = width * height; i < n; i++) {
      indexes.push(i)
    }

    return indexes
  }

  static convertToCsv (words) {
    return words.reduce(
      (
        accumulator,
        {
          text,
          agentLeft,
          agentRight,
          killerLeft,
          killerRight
        }
      ) => {
        const data = []

        data.push(text || '')
        data.push(agentLeft ? '1' : '')
        data.push(agentRight ? '1' : '')
        data.push(killerLeft ? '1' : '')
        data.push(killerRight ? '1' : '')

        return accumulator + ROW_SEPARATOR + data.join(COL_SEPARATOR)
      },
      ['t', 'al', 'ar', 'kl', 'kr'].join(COL_SEPARATOR)
    )
  }

  static convertFromCsv (data) {
    let header = []

    return data
      .split(ROW_SEPARATOR)
      .reduce(
        (accumulator, row, index) => {
          const parsedRow = row.split(COL_SEPARATOR)

          if (index === 0) {
            header = parsedRow
            return accumulator
          }

          const rowAssoc = {}

          header.forEach((name, index) => {
            rowAssoc[name] = parsedRow[index]
          })

          accumulator.push(rowAssoc)

          return accumulator
        },
        []
      )
  }

  static normalizeParsedCsvData (data, userRole = 0) {
    return data.map(row => {
      // noinspection JSUnresolvedVariable
      const item = {
        text: row.t,
        agentLeft: row.al === '1',
        agentRight: row.ar === '1',
        killerLeft: row.kl === '1',
        killerRight: row.kr === '1'
      }

      if (userRole !== 0) {
        (userRole === USER_ROLE_LEFT && item.agentLeft) && (item.agentCurrent = true);
        (userRole === USER_ROLE_RIGHT && item.agentRight) && (item.agentCurrent = true);

        (userRole === USER_ROLE_LEFT && item.killerLeft) && (item.killerCurrent = true);
        (userRole === USER_ROLE_RIGHT && item.killerRight) && (item.killerCurrent = true)
      }

      return item
    })
  }

  static normalizeFromCsv (data, userRole = 0) {
    return WordsService.normalizeParsedCsvData(
      WordsService.convertFromCsv(data),
      userRole
    )
  }
}
