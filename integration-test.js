const assert = require('assert')

describe('Содержимое страницы отображается корректно', () => {
    it('На странице отображается элемент container с историей коммитов', function() {
        return this.browser
            .url('/')
            .isExisting('.container')
            .then(exists => assert.ok(exists, 'История коммитов не отображена'))
    })

    it('На странице отображается элемент git-file-tree со списком файлов', function() {
        return this.browser
            .url('/files/d00ecf8b49692b1140344eadd151a7751f08cb06/')
            .isExisting('.git-file-tree')
            .then(exists => assert.ok(exists, 'Список файлов не отображен'))
    })

    it('На странице отображается элемент file-content с содержимым файла', function() {
        return this.browser
            .url(
                '/content/0f3702f6d74cc990f3acfeb5d6bb32ebdaaf2ffe/utils/git.js'
            )
            .isExisting('.file-content')
            .then(exists => assert.ok(exists, 'Содержимое файла не отображено'))
    })
})

describe('Работа переходов между страницами: ', () => {
    it('После клика на коммит на странице должен появиться элемент git-file-tree со списком файлов', function() {
        return this.browser
            .url('/')
            .click('.commit__link > a')
            .isExisting('.git-file-tree')
            .then(exists =>
                assert.ok(
                    exists,
                    'Переход в список файлов по клику на коммит не произошел'
                )
            )
    })

    it('После клика на файл на странице должен появиться элемент file-content с содержимым файла', function() {
        return this.browser
            .url('/files/0f3702f6d74cc990f3acfeb5d6bb32ebdaaf2ffe/')
            .click('.git-file-tree > li > a')
            .isExisting('.file-content')
            .then(exists =>
                assert.ok(
                    exists,
                    'Содержимое файла по клику на файл не отобразилось'
                )
            )
    })

    it('После клика на любой файл на странице должен появиться элемент file-content с содержимым файла', function() {
        return this.browser
            .url('/files/3e0cf248bd6cb28bcd0a91777c0d4c1560380715/')
            .click('.git-file-tree > li > a[href$="public"]')
            .isExisting('.content > .git-file-tree ')
            .then(exists =>
                assert.ok(
                    exists,
                    'Содержимое папки по клику на файл не отобразилось'
                )
            )
    })
})
