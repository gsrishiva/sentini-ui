import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "productcategory",
})
export class ProductcategoryPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText;
  }
}

@Pipe({
  name: "truncate",
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : "...";
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
