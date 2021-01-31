module.exports = {
    nameWithoutSpace(string) {
        if (typeof string !== "string") {
            return null;
        }

        let nameWithoutSpace = '';
        for (let letter of string) {
            if (letter !== ' ') {
                nameWithoutSpace += letter
            } else {
                nameWithoutSpace += '_'
            }
        }
        return nameWithoutSpace
    }
}