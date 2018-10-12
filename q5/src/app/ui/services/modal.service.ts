import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef
} from '@angular/core';

import { UiModule } from '../ui.module';

interface ChildConfig {
  inputs: object,
  outputs: object
}

@Injectable({
  providedIn: UiModule
})
export class ModalService {
  protected elementId = 'modal-portal';
  protected childComponentRef: any;

  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected appRef: ApplicationRef,
    protected injector: Injector
  ) {
    this.onOverlayClick = this.onOverlayClick.bind(this);
  }

  public open(component: any, inputs: object, outputs: object) {
    let componentConfig = {
      inputs: inputs,
      outputs: outputs
    }

    this.appendComponentTo(this.elementId, component, componentConfig);

    const overlay = document.getElementById(this.elementId);
    overlay.classList.add('modal__overlay');
    overlay.addEventListener('click', this.onOverlayClick);

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('modal__lock');
    body.classList.add('modal--opened');
  }

  public hide() {
    this.removeComponent();

    const overlay = document.getElementById(this.elementId);
    overlay.classList.remove('modal__overlay');
    overlay.removeEventListener('click', this.onOverlayClick);

    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal__lock');
    body.classList.remove('modal--opened');
  }

  protected onOverlayClick({ target }) {
    const overlay = document.getElementById(this.elementId);

    if (overlay) {
      const modal = overlay.querySelector('.modal');

      if (modal && !modal.contains(target)) {
          this.hide();
      }
    }
  }

  protected appendComponentTo(parentId: string, child: any, childConfig?: ChildConfig) {
    const childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(child)
      .create(this.injector);

    this.attachConfig(childConfig, childComponentRef);

    this.childComponentRef = childComponentRef;
    this.appRef.attachView(childComponentRef.hostView);

    const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.getElementById(parentId)
      .appendChild(childDomElem);
  }

  protected removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  protected attachConfig(config, componentRef) {
    let inputs = config.inputs;
    let outputs = config.outputs;

    for (let key in inputs) {
      componentRef.instance[key] = inputs[key];
    }

    for (let key in outputs) {
      componentRef.instance[key] = outputs[key];
    }
  }
}