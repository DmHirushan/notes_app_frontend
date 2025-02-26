export class NotesModel {
    title: string;
    content: string;
    tags: string[];
    userId : string;

    constructor(title: string, content: string, tags: string[], userId: string) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.userId = userId
    }
}