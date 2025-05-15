import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Form80serviceService } from '../services/form80service.service';

export const stepaccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const form80Service = inject(Form80serviceService);
  const router = inject(Router);

  const requestedStep = route.url[0]?.path;
  const currentStep = form80Service.getCurrentStep();

  // Mảng các bước trong quy trình
  const steps = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'q'];
  const requestedStepIndex = steps.indexOf(requestedStep);

  // Nếu bước yêu cầu lớn hơn bước hiện tại, người dùng chưa hoàn thành bước trước
  if (requestedStepIndex > currentStep - 1) {
    const accessibleStep = steps[currentStep - 1];
    router.navigate([`/dang-ky/form80/${accessibleStep}`]);
    return false; // Ngăn không cho truy cập vào bước yêu cầu
  }

  // Cho phép truy cập nếu người dùng đã hoàn thành các bước trước đó
  return true;
};
