import { NgModule } from '@angular/core';

import { UmlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [UmlSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [UmlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class UmlSharedCommonModule {}
