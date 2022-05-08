const $ = {
    Assigned: (object, generator) => {
        if (object != null)
            return generator();
    
        return null;
    }
}

export default $;