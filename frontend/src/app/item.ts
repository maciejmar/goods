export interface Item {
   
        _id?: string;
        name: string;
        description: string;
        category: string;
        price: number;
        owner: string; 
        image?: File;
        createdAt?: Date;       
      
}
