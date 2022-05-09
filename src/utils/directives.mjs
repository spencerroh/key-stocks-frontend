const $ = {
    Assigned: (object, trueGenerator, falseGenerator = () => {}) => {
        if (object != null) {
            return trueGenerator?.();
        } else {
            return falseGenerator?.();
        }
    }
}

export default $;