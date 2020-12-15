import { Coffeebar } from '../coffeebar.model';
import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
	name:"coffeebarFilter"
})

export class CoffeebarFilterPipe implements PipeTransform{
	transform(data:Coffeebar[],searchbar:String):Coffeebar[]{	
	if(!data || !searchbar){
		return data;
	}
	return data.filter(a => a.name.toLowerCase().indexOf(searchbar.toLowerCase())!==-1);
}
}
