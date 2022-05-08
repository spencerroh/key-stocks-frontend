const $ = {
    Assigned: (object, trueGenerator, falseGenerator = () => {}) => {
        if (object != null) {
            trueGenerator?.();
        } else {
            falseGenerator?.();
        }
    
        return null;
    }
}

export default $;